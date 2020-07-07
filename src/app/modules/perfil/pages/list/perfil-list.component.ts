import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../service/perfil.service';
import { Perfil } from '../../domain/perfil';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.scss']
})
export class PerfilListComponent implements OnInit {

  prefilList: Perfil[] = [];

  constructor(private perfilService: PerfilService) {

  }

  ngOnInit(): void {

    this.loadPerfis();

  }

  loadPerfis() {

    this.perfilService.findAll().subscribe(res => {
      this.prefilList = res;
    });

  }
}
