declare interface ITopNewsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  
  TargetAudienceEnableField: string;
  QueryTextField: string;
  OverrideAudiencesQueryLabel: string;
  OverrideAudiencesQueryDescription: string;
  SortByField: string;
 
}

declare module 'TopNewsWebPartStrings' {
  const strings: ITopNewsWebPartStrings;
  export = strings;
}
