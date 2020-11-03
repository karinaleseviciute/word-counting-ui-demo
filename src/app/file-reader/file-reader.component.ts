import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Result } from 'src/app/model/result';
import { Observable } from 'rxjs';
import { FileService } from '../file.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Word } from '../model/word';

@Component({
  selector: 'app-file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.css']
})
export class FileReaderComponent implements AfterViewInit {

  // @ViewChild('fileInput', null) public fileInput: ElementRef;

  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  resultArr: Result[];
  wordModels: Word[];
  public aGWordListSource = new MatTableDataSource<Word>();
  public hNWordListSource = new MatTableDataSource<Word>();
  public oUWordListSource = new MatTableDataSource<Word>();
  public VZWordListSource = new MatTableDataSource<Word>();
  fileInfos: Observable<any>;
  displayedColumns: string[] = ['word', 'duplicates'];

  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(private fileService: FileService) { }

  ngAfterViewInit(): void {
    this.aGWordListSource.sort = this.sort;
    this.getResult();
 }


  selectFiles(event) {
    // this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    this.message = '';
    const formData = new FormData();

    for ( let i = 0; i < this.selectedFiles.length; i++ ) {
      formData.append('file[]', this.selectedFiles[i]);
    }
    this.upload(formData);
    this.getResult();
    this.ngAfterViewInit();
  }

  upload(formData) {

    this.fileService.upload(formData).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
        } else if (event instanceof HttpResponse) {
         // this.getResult();
        }
      },
      err => {
      });
  }

  getResult(){
    this.fileService.getFiles().subscribe(res => {
        this.aGWordListSource.data = res as Word[];
    });
  }

}
