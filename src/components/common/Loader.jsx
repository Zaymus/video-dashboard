import styled from "styled-components";

const LoaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .spinner {
        animation: spin 1.4s linear infinite;
        max-height: 50px;
        max-width: 50px;
    }

    @keyframes spin {
        100% { transform: rotate(360deg); }
    }

    .path {
        stroke: var(--primary);
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
`;

const Loader = () => {
    return (
        <LoaderContainer role='progressbar'>
            <svg className="spinner" viewBox="0 0 50 50">
                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
            </svg>
        </LoaderContainer>
    );
}

export default Loader;