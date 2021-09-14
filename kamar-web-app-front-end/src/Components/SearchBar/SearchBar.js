import React from 'react';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            searchText: ''
        }
    }

    InputFocusToggle = (bool) =>{
        this.setState({isSelected: bool})
    }

    updateSearchText = (event) =>{
        let isSearching = true;
        if(event.target.value === ''){
             isSearching = false;
        }
        this.props.getSearchText(event.target.value , isSearching)
    }

    render() {
        return(
            <form className='search-area'>
                <div className={this.state.isSelected ? 'subject-search-button-active' : 'subject-search-button'}></div>
                <input onChange={(event) => this.updateSearchText(event)} onFocus={() => this.InputFocusToggle(true)} onBlur={() => this.InputFocusToggle(false)} type="text" className={this.state.isSelected ? 'subject-search-active' : 'subject-search'} placeholder="Search"/>
            </form>
        );
    }
}

export default SearchBar