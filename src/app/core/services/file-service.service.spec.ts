import { TestBed } from '@angular/core/testing';

import { FileServiceService } from './file-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('FileServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: FileServiceService = TestBed.get(FileServiceService);
    expect(service).toBeTruthy();
  });
});
