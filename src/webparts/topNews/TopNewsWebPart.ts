import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { sp } from '@pnp/sp';
import { INewsSearchService } from './services/INewsSearchService';
import { NewsSearchService } from './services/NewsSearchService';
import {
  IPropertyPaneConfiguration,
  PropertyPaneToggle,
  PropertyPaneLabel,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TopNewsWebPartStrings';
import TopNews from './components/TopNews';
import { ITopNewsProps } from './components/ITopNewsProps';

export interface ITopNewsWebPartProps {
  title: string;
  targetAudiencesToggle: boolean;
  queryText: string;
  sortBy: string;
  overrideAudiencesQuery:string;
}

export default class TopNewsWebPart extends BaseClientSideWebPart <ITopNewsWebPartProps> {

  
  protected onInit(): Promise<void> {
    sp.setup({
        spfxContext: this.context
    });

    return super.onInit();
}
  public render(): void {
    var newsSearchProvider: INewsSearchService = new NewsSearchService();
    console.log("props :");
    console.log(this.properties);
    const element: React.ReactElement<ITopNewsProps> = React.createElement(
      TopNews,
      {
        title: this.properties.title,
        targetAudiencesEnable: this.properties.targetAudiencesToggle,
        query: this.properties.overrideAudiencesQuery,
        sortBy: this.properties.sortBy,
        newsSearchService: newsSearchProvider,
        
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let queryTextProperty: any;
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle('targetAudiencesToggle', {
                  label: strings.TargetAudienceEnableField
              }),
              
              PropertyPaneTextField('overrideAudiencesQuery', {
                  label: strings.OverrideAudiencesQueryLabel,
                  description: strings.OverrideAudiencesQueryDescription
              }),
              PropertyPaneDropdown('sortBy', {
                  label: strings.SortByField,
                  options: [
                      { key: 'Created', text: 'Created' },
                      { key: 'FirstPublishedDate', text: 'FirstPublishedDate' },
                      { key: 'LastModifiedTime', text: 'LastModifiedTime' }
                  ],
                  selectedKey: 'FirstPublishedDate',
              })
              ]
            }
          ]
        }
      ]
    };
  }
}
