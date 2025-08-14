import { useState, useMemo } from "react";
import styled from "styled-components";

const Image = styled.img`
  object-fit: contain;
`

const Thumbnail = ({ thumbnails }) => {
  const [url, setUrl] = useState(null);

  useMemo(() => {
    let url = '';
    if(thumbnails?.standard) url = thumbnails.standard.url;
    if(thumbnails?.medium) url = thumbnails.medium.url;
    if(thumbnails?.high) url = thumbnails.high.url;
    if(thumbnails?.maxres) url = thumbnails.maxres.url;
    setUrl(url) 
  }, [thumbnails]);


  return <Image src={url}></Image>
};

export default Thumbnail;