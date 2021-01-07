import { INewsSearchService } from "../services/INewsSearchService";
import { DisplayMode } from '@microsoft/sp-core-library';


export interface ITopNewsProps {
  title: string;  
  targetAudiencesEnable: boolean;
  query: string;  
  sortBy: string;
  newsSearchService: INewsSearchService;  
}
