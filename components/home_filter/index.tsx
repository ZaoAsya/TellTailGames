import React, { ChangeEvent, Component, FormEvent } from 'react';
import Hashtag from '../../server/models/hashtag';
import Autocomplete from '../autocomplete';
import './index.css';

interface HomeFilterProps {
  onFilterSelected: (filters: any) => void;
}

interface HomeFilterState {
  chosenTagIds: number[];
  chosenTags: Hashtag[];
  filters: {
    tags: Hashtag[];
    text: string;
  };
}

export default class HomeFilter extends Component<HomeFilterProps, HomeFilterState> {

  state = {
    chosenTagIds: [],
    chosenTags: [],
    filters: {
      tags: [],
      text: '',
    },
  };

  onChoseTag = (tag: Hashtag) => {
    const {chosenTags, chosenTagIds, filters} = this.state;
    const newTags = [...chosenTags, tag];
    const newTagsId = [...chosenTagIds, tag.id];
    this.setState({
      chosenTagIds: newTagsId,
      chosenTags: newTags,
      filters: {
        tags: newTags,
        text: filters.text
      }});
  }

  filterUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {filters} = this.state;
    this.props.onFilterSelected(filters);
  }

  onChangeTextField = (e: ChangeEvent<HTMLInputElement>) => {
    const {filters} = this.state;
    this.setState({
      filters: {
        tags: filters.tags,
        text: e.target.value
      }
    });
  }

  onClickRemove = (tagId: number) => {
    const {chosenTagIds, chosenTags, filters} = this.state;
    chosenTagIds.splice(chosenTagIds.findIndex((id: number) => tagId === id), 1);
    this.setState({
      chosenTagIds,
      chosenTags: chosenTags.filter((tag: Hashtag) => tag.id !== tagId),
      filters: {
        tags: chosenTags.filter((tag: Hashtag) => tag.id !== tagId),
        text: filters.text, }
    });
  }

  render() {
    const {chosenTags, chosenTagIds} = this.state;
    return (
      <div className="home-filter">
        <form className="home-filter__row" onSubmit={this.filterUpdate}>
          <input type="search"
                 placeholder="Текст запроса"
                 className="home-filter__text"
                 onChange={this.onChangeTextField}/>
          <input type="submit"
                 className="button-pink"
                 value="Найти"/>
        </form>
        <div className="home-filter__row">
          <div className="home-filter__chosen-tags-container">
            <section className="home-filter__chosen-tags">
              {chosenTags.length ? (
                chosenTags.map((tag: Hashtag) => (
                  <div className='chosen-tags__item'
                       key={tag.id}>
                    <div className='chosen-tags-item__text'>#{tag.nameRu}</div>
                    <button className='chosen-tags-item__remove-button'
                            onClick={this.onClickRemove.bind(this, tag.id)}>
                      &#10006;
                    </button>
                  </div>
                ))
              ) : ''}
            </section>
          </div>
          <Autocomplete chosenTagIds={chosenTagIds}
                        onChoseTag={this.onChoseTag}/>
        </div>
      </div>
    );
  }
}
