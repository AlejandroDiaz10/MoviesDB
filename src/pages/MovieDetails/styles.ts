import styled from "styled-components";

export const SpinnerContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100%;
`;

export const MainContainer = styled.div`
display: flex;
`;

export const MovieContainer = styled.div`
display: flex;
width: 95%;
margin: 20px 0;
justify-content: start;
align-items: start;
`;

export const ImageContainer = styled.div`
width: 25%;
margin-right: 2.5%;
`;

export const Image = styled.img`
max-width: 100%;
height: auto;
border-radius: 8px;
`;

export const InfoContainer = styled.div`
width: 70%;
`;

export const MovieTitle = styled.h1`
color: black;
font-size: 2.5rem;
text-transform: uppercase;
line-height: 2.7rem;
margin: 20px auto;
letter-spacing: -2px;
`

export const Header = styled.h2`
color: black;
font-size: 1.7rem;
text-transform: uppercase;
width: 95%;
margin: 10px auto 10px 2.5%;
position: sticky;
font-weight: 600;
letter-spacing: -1px;
`

export const Text = styled.p`
color: black;
font-size: 14px;
margin: 0 auto;
`

export const Carousel = styled.div`
overflow-x: auto; 
scroll-snap-type: x mandatory;
`;

export const Section = styled.section`
margin: 20px auto 30px;
`;

export const Wrapper = styled.div`
margin-left: 1%;
margin-right: 1%;
`;

export const Bar = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
margin-top: 10px;
`;

export const Icon = styled.span`
display: flex;
align-items: center;
font-size: 16px;
text-align: left!important;
margin-right: 15px;
padding-right: 15px;
line-height: 12px;
font-weight: 500;
margin-right: 30px;
`;

export const Pill = styled.div`
background: #56B813;
color: #fff;
padding: 6px;
font-size: 14px;
font-weight: 500;
line-height: 13px;
margin: 0 5px 0 0;
border-radius: 5px;
`;


export const Button = styled.div`
background: blue;
color: #fff;
padding: 12px;
font-size: 14px;
font-weight: bold;
line-height: 13px;
margin: 0 5px 0 0;
border-radius: 5px;
display: inline-flex; 
align-items: center; 
justify-content: center;
margin-top: 10px;
filter: brightness(85%);
&:hover {
    cursor: pointer;
    filter: brightness(100%);
}
`;