import React, { Component } from 'react';
import Hashtag from '../../server/models/hashtag';
import { fetchData } from '../../server/utils';
import './index.css';

interface AuthocompleteProps {
  chosenTagIds: number[];
  onChoseTag: (tag: Hashtag) => void;
}

export default class Autocomplete extends Component<AuthocompleteProps> {

  state = {
    activeTagIndex: null,
    activeTagNode: null,
    tagName: '',
    tagNodes: [],
  };

  fetchTags = (value: string) => {
    this.setState({
      tagNodes: value === '' ? [] : this.state.tagNodes
    });
    fetchData('/api/tags',
      {request: value.toLowerCase()})
      .then((tags: Hashtag[]) => {
        const filteredExistTag = tags.filter((tag: Hashtag) => !this.props.chosenTagIds.includes(tag.id));
        this.setState({tagNodes: filteredExistTag});
      });
  }

  activateTagNode = (prevIndex: number|null, newIndex: number) => {
    const {activeTagNode, tagNodes} = this.state;
    if (prevIndex !== null && activeTagNode !== null) {
      this.deactivateTagNode();
    }
    this.setState({activeTagIndex: newIndex, activeTagNode: tagNodes[newIndex]});
  }

  deactivateTagNode = () => {
    const {activeTagNode} = this.state;
    if (!activeTagNode) {return; }
    this.setState({activeTagNode: null, activeTagIndex: null});
  }

  onMouseOver = (event: any) => {
    const {activeTagIndex, tagNodes} = this.state;
    const node = event.target.textContent;
    const index = tagNodes.findIndex((tag: Hashtag) => tag.nameRu === node);
    this.activateTagNode(activeTagIndex, index);
  }

  onKeyDown = () => {
    const {activeTagIndex, tagNodes} = this.state;
    const index = activeTagIndex === null || activeTagIndex === tagNodes.length - 1 ? 0 : activeTagIndex + 1;
    this.activateTagNode(activeTagIndex, index);
  }

  onKeyUp = () => {
    const {activeTagIndex, tagNodes} = this.state;
    if (activeTagIndex === null) {
      return;
    }
    const index = activeTagIndex === 0 ? tagNodes.length - 1 : activeTagIndex - 1;
    this.activateTagNode(activeTagIndex, index);
  }

  onEnter = () => {
    const {activeTagIndex, tagNodes} = this.state;
    if (activeTagIndex === null) {
      return;
    }
    this.onSelectTag(activeTagIndex);
    if (activeTagIndex > 0) {
      this.activateTagNode(activeTagIndex, activeTagIndex - 1);
    } else if (activeTagIndex === 0 && tagNodes.length >= 1) {
      this.activateTagNode(0, 0);
    } else {
      this.deactivateTagNode();
    }
  }

  changeTagField = (e: any) => {
    this.setState({tagName: e.target.value});
  }

  onChangeField = (e: any) => {

    switch (e.key) {
      case "ArrowDown":
        this.onKeyDown();
        break;
      case "ArrowUp":
        this.onKeyUp();
        break;
      case "Enter":
        this.onEnter();
        break;
      default:
        this.fetchTags(e.target.value);
        return;
    }
  }

  onSelectTag = (index: number) => {
    const {tagNodes} = this.state;
    const {chosenTagIds} = this.props;
    const tag: Hashtag = tagNodes[index];
    tagNodes.splice(index, 1);
    if (!chosenTagIds.includes(tag.id)) {
      this.setState({tagName: ''});
      this.props.onChoseTag(tag);
    }
  }

  render() {
    const {tagNodes, tagName, activeTagIndex} = this.state;
    return (
      <div className="autocomplete">
        <div className="autocomplete-search">
          <input type="search"
                 placeholder="Хэштег"
                 className="autocomplete-input"
                 value={tagName}
                 onChange={this.changeTagField}
                 onKeyUp={this.onChangeField}/>
        </div>
        <div className="autocomplete-list"
             onMouseOut={this.deactivateTagNode}>
          {tagNodes.length ? (
            tagNodes.map((tag: Hashtag, index) => (
              <div className={`autocomplete-list-item${index === activeTagIndex ?
                ' autocomplete__active-tag' : ''}`}
                   key={tag.id}
                   onMouseOver={this.onMouseOver}
                   onClick={this.onSelectTag.bind(this, index)}>
                {tag.nameRu}
              </div>
            ))
          ) : (tagName ? (
            <div className='autocomplete-list__no'>Таких тегов нет...</div>
          ) : '')}
        </div>
      </div>
    );
  }
}
