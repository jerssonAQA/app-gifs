import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList:Gif[]=[];
  private _tagsHistory:string[]=[];
  private apiKey      :string='Xyym62qHnDBENDm2lacPSIqu8UoAgH1G';
  private serviceUrl  :string='https://api.giphy.com/v1/gifs';

  constructor(private http:HttpClient) {
    this.loadLocalStorage();
    console.log(' Git service Ready')

  }

  get tagHistory(){
    return [...this._tagsHistory];
  }

  private ordenizaHistory(tag:string){
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag)=> oldTag !==tag)
  }
  this._tagsHistory.unshift(tag);
  this._tagsHistory=this._tagsHistory.splice(0,10);
  this.saveLocalStrorage();
}

  private saveLocalStrorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if (!localStorage.getItem('history')) return;

    this._tagsHistory=JSON.parse( localStorage.getItem('history')!)
    if (this._tagsHistory.length ===0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag:string):void{
    if (tag.length===0) return;
    this.ordenizaHistory(tag);
    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit',10)
      .set('q',tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe((resp)=>{
        this.gifList=resp.data;
        // console.log({gifs:this.gifList});
      })

  }
}
