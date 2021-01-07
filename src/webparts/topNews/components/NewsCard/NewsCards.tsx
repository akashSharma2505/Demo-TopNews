import * as React from 'react';
import styles from '../../assets/scss/NewsCard.module.scss';
import { INewsCardsProps } from './INewsCardsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {
    DocumentCard,
    DocumentCardActivity,
    DocumentCardDetails,
    DocumentCardPreview,
    DocumentCardTitle,
    IDocumentCardPreviewProps,
    DocumentCardType,
    IDocumentCardActivityPerson,
    DocumentCardImage
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';

import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { Stack, IStackStyles, IStackProps, IStackTokens, IStackItemStyles, StackItem } from 'office-ui-fabric-react/lib/Stack';


import INews from '../../models/INews';

export interface INewsCardsState {
    topNews: Array<INews>;
    lowNews: Array<INews>;
    loading: boolean;
}

const stackStyles: IStackStyles = {
    root: {
        overflow: "visible",
        width: `100%`,
    },
};

export default class NewsCards extends React.Component<INewsCardsProps, INewsCardsState> {

    constructor(props) {
        super(props);

        this.state = {
            topNews: [],
            lowNews: [],
            loading: true
        };
    }


    public componentDidMount(): void {

        this.setState({
            topNews: this.props.News.splice(0, 4),
            lowNews: this.props.News.splice(0, 4),
            loading: false
        });
        console.log("NewsCard state->");
        console.log(this.state);
    }

    private _createTopCards(topNews: INews) {
        return (
            <DocumentCard
                // type={DocumentCardType.normal}
                styles={{
                    root: { display: 'inline-block', marginRight: 10, marginBottom: 10, width: 220 },
                }}
                onClickHref={topNews.Url}>
                <DocumentCardImage height={150} imageFit={ImageFit.cover} imageSrc={topNews.ThumbnailUrl} />
                <DocumentCardDetails>
                    <DocumentCardTitle title={topNews.Title} shouldTruncate />
                    <DocumentCardActivity activity={topNews.DisplayDate.toDateString()} people={[{ name: topNews.CreatedBy, profileImageSrc: "" }]} />
                </DocumentCardDetails>
            </DocumentCard>

        );
    }

    private _createlowCards(lowNews: INews) {
        return (
            <DocumentCard
                type={DocumentCardType.compact}
                // styles={{
                //     root: { display: 'inline-block', marginRight: 20, marginBottom: 20, width: 320 },
                // }}
                onClickHref={lowNews.Url}>
                <DocumentCardImage height={150} imageFit={ImageFit.cover} imageSrc={lowNews.ThumbnailUrl} />
                <DocumentCardDetails>
                    <DocumentCardTitle title={lowNews.Title} shouldTruncate />
                    <DocumentCardActivity activity={lowNews.DisplayDate.toDateString()} people={[{ name: lowNews.CreatedBy, profileImageSrc: "" }]} />
                </DocumentCardDetails>
            </DocumentCard>

        );
    }
    // put spinner for loading in here
    public render(): React.ReactElement<INewsCardsProps> {
        return (
            <div>
                <Stack horizontal wrap>
                    <div className={styles.topNewsCards}>
                        <Stack wrap
                            horizontal
                            styles={stackStyles}
                            tokens={{ childrenGap: 10 }}>
                            {this.state.topNews &&
                                this.state.topNews.map(News => {
                                    return this._createTopCards(News);
                                })
                            }
                        </Stack>
                    </div>

                    <div className={styles.lowNewsCards}>
                        <Stack
                            tokens={{ childrenGap: 10 }}>
                            {this.state.lowNews &&
                                this.state.lowNews.map(News => {
                                    return this._createlowCards(News);
                                })
                            }
                        </Stack>
                    </div>
                </Stack>
            </div>
        );
    }


}