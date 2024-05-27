import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit{

  @Input()
  public url!: string;

  @Input()
  public alt:String="";

  public hasLoader: boolean=false;

  ngOnInit(): void {
    if (!this.url) throw new Error('URL property is required');
  }
  onload(){
    setTimeout(()=>{

    },1000);
    this.hasLoader=true;
  }
}
