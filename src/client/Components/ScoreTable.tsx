import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import {useGame} from "../hooks/gameProvider";
import axios from "axios";
import {IScoreTable} from "../../server/scoreTable";
import {formatTime} from "../helpers/timerHelper";


export const ScoreTable = () => {
  const {setShowScores} = useGame();
  const [scores, setScores] = useState<IScoreTable[]>([]);

  const getResults = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/scores');
      console.log(response);

      setScores(
      response.data.sort((a: IScoreTable, b: IScoreTable) => {
        return a.moves - b.moves;
      })
      );
    } catch (error) {
    }
  };
  useEffect(() => {
    getResults();
  }, []);

  return (
    <React.Fragment>
      <div className="score-table">
        <div className="score-table-content">
          <Table striped bordered hover variant="dark">
            <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>moves</th>
              <th>time</th>
            </tr>
            </thead>
            <tbody>
            {scores.map((sc: IScoreTable, index) => {
              return (<tr>
                <td>{index}</td>
                <td>{sc.name}</td>
                <td>{sc.moves}</td>
                <td>{formatTime(sc.time)}</td>
              </tr>)
            })
            }
            </tbody>
          </Table>
          <button onClick={() => setShowScores(false)}>ok</button>
        </div>
      </div>
    </React.Fragment>
  );
}