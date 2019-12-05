import { GameClient, IInputEvent, IScreenInput } from '@mixer/interactive-node';
import translateCoordinatesToScreen from '../helpers/mixplay/translateCoordinatesToScreen';
import addBalls from '../helpers/phaser/addBalls';

class Interactive {
  private session: GameClient;
  private readonly debugMode: boolean;

  constructor() {
    this.session = new GameClient();
    this.debugMode = false;
  }

  public setup(scene: Phaser.Scene, token: string): void {
    this.onOpen(scene);
    this.onDebug();
    this.handleState();

    this.session.open({
      authToken: token,
      versionId: +process.env.API_VERSION_ID
    });
  }

  private onOpen(scene: Phaser.Scene): void {
    this.session.on('open', async () => {
      await this.session.synchronizeState();

      this.onMouseDown(scene);

      await this.session.ready(true);
    });
  }

  private onDebug(): void {
    if (this.debugMode) {
      this.session.on('message', (err: any) => console.log('<<<', err));
      this.session.on('send', (err: any) => console.log('>>>', err));
      this.session.on('error', (err: any) => console.log(err));
    }
  }

  private handleState(): void {
    this.session.state.on('participantJoin', participant => {
      console.log(`${participant.username}(${participant.sessionID}) Joined`);
    });
    this.session.state.on(
      'participantLeave',
      (participantSessionID: string, participant: any) => {
        console.log(`${participant.username}(${participantSessionID}) Left`);
      }
    );
  }

  private onMouseDown(scene: Phaser.Scene): void {
    const control = this.session.state.getControl('Drop balls');

    control.on('mousedown', (inputEvent: IInputEvent<IScreenInput>) => {
      const { x, y } = translateCoordinatesToScreen(
        inputEvent.input.x,
        inputEvent.input.y
      );
      addBalls(scene, x, y);
    });
  }
}

export default new Interactive();
