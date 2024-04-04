import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';


@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  // public tag:string='';
  constructor(private gifsService: GifsService) { }

  get tags() {
    return this.gifsService.tagHistory;
  }
  evento(): void {
    // this.gifsService.searchTag(this.tag);
    console.log(this.tags);
  }
}
