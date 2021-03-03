import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import ScoreTable from './scoreTable'

const SERVER_PORT = 3000;
const URL = 'mongodb+srv://student:1234qwer@cluster0.n1cm5.mongodb.net/app?retryWrites=true&w=majority';

const server = express();
server.use(express.json());
server.use(cors());
server.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

server.get('/api/scores', async (req: Request, res: Response) => {
  try {
    const scores = await ScoreTable.find({});
    return res.json(scores);
  } catch (e) {
    return res.status(500).json({message: 'Can not get scores'});
  }
})
server.post('/api/score', async (req: Request, res: Response) => {
  try {
    const score = new ScoreTable({name: req.body.name, time: req.body.time, moves: req.body.moves});
    await score.save();
    return res.status(200).json({message: 'Score uploaded'});
  } catch (e) {
    return res.status(500).json({message: 'Can not save score'});
  }
})