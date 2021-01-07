import INews from '../models/INews';


export interface INewsSearchService {
    getAllNews(
        queryText: string,       
        targetAudianceEnable: boolean,
        sortBy: string,
        overrideAudiencesQuery: string
    ): Promise<Array<INews>>;
}
