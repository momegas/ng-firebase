import { AppEnterModule } from './app-enter.module';

describe('AppEnterModule', () => {
  let appEnterModule: AppEnterModule;

  beforeEach(() => {
    appEnterModule = new AppEnterModule();
  });

  it('should create an instance', () => {
    expect(appEnterModule).toBeTruthy();
  });
});
