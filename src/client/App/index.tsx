import React from 'react';
import { Game } from '../Components/Game';
import '../style/style.scss'
import {GameProvider} from "../hooks/gameProvider";
import {ListGroup, OverlayTrigger, Popover} from "react-bootstrap";
export const App = () => {

  const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Hot keys</Popover.Title>
    <Popover.Content>
      <ListGroup variant="flush">
        <ListGroup.Item>shift+n new game </ListGroup.Item>
        <ListGroup.Item>shift+w show all</ListGroup.Item>
        <ListGroup.Item>shift+q show scores</ListGroup.Item>
        <ListGroup.Item>shift+d sound off</ListGroup.Item>
        <ListGroup.Item>shift+m music on</ListGroup.Item>
        <ListGroup.Item>tab next cell</ListGroup.Item>
      </ListGroup>
    </Popover.Content>
  </Popover>
  )
  return (
    <GameProvider>
    <React.Fragment>

      <h3 className="game-name">SUDOKU</h3>
      <OverlayTrigger trigger="click" placement="left" overlay={popover}>
      <div className="help-menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
          <path d="M0 0h48v48H0z" fill="none"/>
          <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 34h-4v-4h4v4zm4.13-15.49l-1.79 1.84C26.9 25.79 26 27 26 30h-4v-1c0-2.21.9-4.21 2.34-5.66l2.49-2.52C27.55 20.1 28 19.1 28 18c0-2.21-1.79-4-4-4s-4 1.79-4 4h-4c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.76-.71 3.35-1.87 4.51z" fill="deeppink"/>
        </svg>
      </div>
      </OverlayTrigger>
      <Game />
    </React.Fragment>
    </GameProvider>
  );
};