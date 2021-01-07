import { INewsSearchService } from './INewsSearchService';
import INews from '../models/INews';


import { sp } from "@pnp/sp";
import "@pnp/sp/search";
import { SearchQueryBuilder,SearchResults, ISearchBuilder, ISearchQuery, SortDirection, ISort } from "@pnp/sp/search";



export class NewsSearchService implements INewsSearchService {
    public async getAllNews(queryText: string,  targetAudienceEnabled: boolean, sortBy: string, overrideAudiencesQuery: string): Promise<INews[]> {
        try {
            
            let searchQueryBuilder = this.getSearchQueryBuilder(queryText, targetAudienceEnabled, sortBy, overrideAudiencesQuery);
            
           
            let searchResults = await sp.search(searchQueryBuilder);
            console.log(overrideAudiencesQuery)
            // TODO: Debug log
            console.log("SearchResults ->");
            console.log(searchResults);
            let newsPageItems: Array<INews> = [];
            searchResults.PrimarySearchResults.map(newsPage => {
                newsPageItems.push(<INews>{
                    id: newsPage["ListItemID"],
                    Title: newsPage.Title,
                    SiteTitle: newsPage["SiteTitle"],
                    Description: newsPage.Description,
                    ThumbnailUrl: newsPage.PictureThumbnailURL,
                    Url: newsPage.OriginalPath,
                    CreatedBy: newsPage["Author"],
                    DisplayDate: new Date(newsPage[sortBy])
                });
            });
            // TODO: Debug log
            console.log("search results are :")
            console.log(newsPageItems);
            return newsPageItems;
        }
        catch (error) {
            // TODO: Debug log
            Promise.reject(error);
        }
    }

    private getSearchQueryBuilder(baseQueryText: string,  targetAudienceEnabled: boolean, sortByManagedProperty: string, overrideAudiencesQuery: string): ISearchBuilder {
        console.log("inside searchquerybuilder function"+ baseQueryText)
        var queryText = null;
        if (targetAudienceEnabled === false) {
            queryText = baseQueryText;
        }
        else {
            // write code with respect to target audience functionality here
           
        }

        let settings: ISearchQuery = {
            TrimDuplicates: false,
            RowLimit: 8,
            SelectProperties: [
                "Title",
                "PictureThumbnailURL",
                "Author",
                "CreatedBy",
                "Created",
                "FirstPublishedDate",
                "ModifiedOWSDATE",
                "OriginalPath",
                "ListID",
                "ListItemID",
                "LastModifiedTime",
                "SiteTitle",
                "ModifiedById",                
            ],
            SortList: [
                <ISort>{ Direction: SortDirection.Descending, Property: sortByManagedProperty }
            ]
        };

        return SearchQueryBuilder(queryText, settings);
    }
}
