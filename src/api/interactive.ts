import { GameClient } from '@mixer/interactive-node';

class Interactive {
  private session: GameClient;
  private readonly debugMode: boolean;

  constructor() {
    this.session = new GameClient();
    this.debugMode = true;
  }

  public setup(token: string): void {
    this.onOpen();
    this.addEventListeners();
    this.handleState();

    this.session.open({
      authToken: token,
      versionId: +process.env.API_VERSION_ID
    });
  }

  private onOpen(): void {
    this.session.on('open', () => {
      this.session.ready(true);
    });
  }
  private addEventListeners(): void {
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
}

export default new Interactive();
