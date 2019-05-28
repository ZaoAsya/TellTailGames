import React, {Component} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { AdventureComponent } from '../components/adventure';
import HomeFilter from '../components/home_filter';
import Adventure from '../server/models/adventure';
import Hashtag from '../server/models/hashtag';
import { fetchData } from '../server/utils';
import '../static/styles/home.css';

interface HomePageProps {
  adventures: Adventure[];
  title: string;
}

interface FilterFields {
  advIndex: number;
  tags: Hashtag[];
  text: string;
}

interface HomePageState {
  adventures: Adventure[];
  filtered: boolean;
  filters: FilterFields;
  hasMore: boolean;
}

export default class HomePage extends Component<HomePageProps, HomePageState> {
  static getInitialProps({req, query}: any) {
    const title = query.title;
    const adventures = query.adventures;
    return {title, adventures };
  }

  state: any = {
    adventures: this.props.adventures,
    filtered: false,
    filters: {
      advIndex: 0,
      tags: [],
      text: '',
    },
    hasMore: true
  };

  fetchMoreAdventures = () => {
    const {filters, adventures} = this.state;
    const lastAdvId = adventures[adventures.length - 1].id;
    fetchData('/api/adventures', {
      advIndex: lastAdvId,
      tags: filters.tags,
      text: filters.text,
    }).then((advs) => {
      this.setState({
        adventures: adventures.concat(advs),
        filtered: false,
        filters: {
          advIndex: advs ? advs[advs.length - 1].id : lastAdvId,
          tags: filters.tags,
          text: filters.text,
      },
        hasMore: advs ? advs.length === 5 : false
      });
    });
  }

  onFilterSelected = ({text, tags}: any) => {
    const { filtered, filters} = this.state;
    const lastAdvId = filtered ? filters.advIndex : 0;
    fetchData('/api/adventures',
      { text, tags, advIndex: lastAdvId })
      .then((advs: Adventure[]) => {
        this.setState({
          adventures: advs,
          filtered: advs.length === 5,
          filters: {
            advIndex: advs[advs.length - 1].id,
            tags,
            text
          },
          hasMore: advs.length === 5
        });
      });
  }

  render() {
    const {adventures, hasMore} = this.state;
    const title = this.props.title;
    if (!title) {
      return <p>Loading...</p>;
    }
    return (
      <article className='home-template'>
        {title === 'home' ? (
          <HomeFilter onFilterSelected={this.onFilterSelected}/>
        ) : (
          <p className="home__title">#{title}</p>
        )}
        {adventures === undefined || adventures.length === 0 ? (
          <p className="home__title">Нет приключений...</p>
        ) : (
          <InfiniteScroll dataLength={adventures.length}
                          next={this.fetchMoreAdventures}
                          hasMore={hasMore}
                          loader={<p className="home__title">Идет загрузка...</p>}
                          scrollThreshold={0.95}>
            {adventures.map((adv: Adventure) => (
              <AdventureComponent picture={adv.picture}
                              name={adv.name}
                              description={adv.description}
                              firstSceneId={adv.firstSceneId}
                              tags={adv.tags}
                              users={adv.users}
                              key={adv.id}/>
              ))}
          </InfiniteScroll>
          )}
      </article>
    );
  }
}
