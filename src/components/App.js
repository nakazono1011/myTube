import React from "react";
import VideoDetail from "./VideoDetail";
import SearchBar from "./SearchBar";
import VideoLists from "./VideoLists";
import "../api/youtube";
import youtube from "../api/youtube";

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null
    };

    componentDidMount(){
        this.onTermSubmit("川崎");
    }

    onTermSubmit = async (term) => {
        const response = await youtube.get("./search", {
            params: {
                q: term
            }
        });
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        })
    }

    onSelectVideo = (video) => {
        this.setState({ selectedVideo: video })
    }

    render() {
        return (
            <div className="ui container" style={{margin: "10px 0px"}}>
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoLists videos={this.state.videos} onSelectVideo={this.onSelectVideo} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;