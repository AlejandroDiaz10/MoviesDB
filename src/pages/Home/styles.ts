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

export const Header = styled.h1`
color: black;
font-size: 2.5rem;
text-transform: uppercase;
width: 95%;
margin: 10px auto 10px 2.5%;
position: sticky;
`

export const Carousel = styled.div`
overflow-x: auto; 
scroll-snap-type: x mandatory;
`;

export const HomeWrapper = styled.div`
margin-left: 1%;
margin-right: 1%;
`;

export const Section = styled.section`
margin: 20px auto 30px;
`;