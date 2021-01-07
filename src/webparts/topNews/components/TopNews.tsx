import * as React from 'react';

import { ITopNewsProps } from './ITopNewsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from '../assets/scss/DemoNews.module.scss';
import INews from '../models/INews';
import NewsCards from './NewsCard/NewsCards';

import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

export interface ITopNewsState{
  AllNews: Array<INews>;
  loading: boolean;
}

export default class TopNews extends React.Component<ITopNewsProps, ITopNewsState> {


  constructor(props) {
    super(props);

    this.state = {
      AllNews: [],
      loading: true
    };
  }


  public componentDidMount(): void {
    console.log("load news called")
    this.loadAllNews(this.props);
  }

  public componentWillReceiveProps(newProps) {
    if (newProps != this.props) {
      this.loadAllNews(newProps);
    }
  }
  private loadAllNews(props: ITopNewsProps) {
    this.props.newsSearchService.getAllNews(props.query, props.targetAudiencesEnable, props.sortBy, props.query).then(result => {
      console.log("resulted news:")
      console.log(result)
      this.setState({
        AllNews: result,
        loading: false
      });
    });
  }

  public render(): React.ReactElement<ITopNewsProps> {
    return (
      <div className={styles.demoNews}>
       {   this.state.AllNews.length > 0 && !this.state.loading &&  
          <NewsCards News={this.state.AllNews} />}
          
    

        {this.state.loading &&
          <Spinner label="Loading ... " ariaLive="assertive" labelPosition="right" />}
        {/* </Stack> */}
      </div>
    );
  }
}
