import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHistorique } from './client-historique';

describe('ClientHistorique', () => {
  let component: ClientHistorique;
  let fixture: ComponentFixture<ClientHistorique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientHistorique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientHistorique);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
