import { Test, TestingModule } from '@nestjs/testing';
import { ShorturlController } from './shorturl.controller';
import { ShorturlRepository } from './shorturl.repository';
import { ShorturlService } from './shorturl.service';

describe('ShorturlService', () => {
  let service: ShorturlService;

  beforeEach(async () => {
    const inMemShortUrls = [];
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShorturlService,
        {
          provide: ShorturlRepository,
          useValue: {
            create: (obj) => {
              inMemShortUrls.push(obj);
              return obj;
            },
            findOne: (shortcode) => {
              return inMemShortUrls.find(
                (shorturl) => shorturl.shortcode === shortcode,
              );
            },
            update: (shortcode, updates) => {
              const index = inMemShortUrls.findIndex(
                (shorturl) => shorturl.shortcode === shortcode,
              );

              if (index === -1) {
                return;
              }

              inMemShortUrls[index] = { ...inMemShortUrls[index], ...updates };
            },
          },
        },
      ],
    }).compile();

    service = module.get<ShorturlService>(ShorturlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates with valid arguments', async () => {
    const resp = await service.create('https://example.com', 'example');

    expect(resp.shortcode).toEqual('example');
  });

  it('should throws error with invalid arguments', async () => {
    try {
      const resp = await service.create('https://example.com', 's');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('gets a valid shortcode', async () => {
    await service.create('https://example.com', 'example');

    const resp = await service.get('example');

    expect(resp).toEqual('https://example.com');
  });

  it('updates count on every get req', async () => {
    await service.create('https://example.com', 'example');

    await service.get('example');
    await service.get('example');
    await service.get('example');
    const resp = await service.stats('example');

    expect(resp.redirectCount).toEqual(3);
  });
});
