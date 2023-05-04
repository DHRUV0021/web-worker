import { Component, OnInit } from '@angular/core';
import { PrimeCalculator } from './app.prime';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Web worker sample';
  prime10: number = 0;
  prime10000: number = 0;
  prime100001: number = 0;
  prime100002: number = 0;
  prime100003: number = 0;
  prime100004: number = 0;


  find10thPrimeNumber(){
    this.prime10 = PrimeCalculator.findNthPrimeNumber(10);
  }

  find10000thPrimeNumber() {
    if (typeof Worker !== 'undefined') {

      // Create a new  web worker
      const worker = new Worker(new URL('./app.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.prime10000 = data;
      };
      worker.postMessage(1000);

      const worker1 = new Worker(new URL('./app.worker', import.meta.url));
      worker1.onmessage = ({ data }) => {
        this.prime100001 = data;
      };
      worker1.postMessage(8000);

      const worker2 = new Worker(new URL('./app.worker', import.meta.url));
      worker2.onmessage = ({ data }) => {
        this.prime100002 = data;
      };
      worker2.postMessage(200);

      const worker3 = new Worker(new URL('./app.worker', import.meta.url));
      worker3.onmessage = ({ data }) => {
        this.prime100003 = data;
      };
      worker3.postMessage(3000);

      const worker4 = new Worker(new URL('./app.worker', import.meta.url));
      worker4.onmessage = ({ data }) => {
        this.prime100004 = data;
      };
      worker4.postMessage(6000);

    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }


  // --------------------------------------ERROR RIDDING--------------------------
  myObsever = new Observable((observer) => {
    console.log('observal start')

    setTimeout(() => { observer.next("1") }, 1000)
    setTimeout(() => { observer.next("2") }, 2000)
    setTimeout(() => { observer.next("3") }, 3000)
    setTimeout(() => { observer.next("4") }, 4000)
    setTimeout(() => { observer.next("5") }, 5000)
    // setTimeout(()=>{observer.error(new Error("somthing want wrong"))},5000)
    setTimeout(() => { observer.next("6") }, 6000)
    setTimeout(() => { observer.complete() }, 7000)
  });

  ngOnInit(): void {
    this.myObsever.subscribe((val: any) => {
      console.log(val);

    }, (error: { message: any; }) => {
      alert(error.message);

    }, () => {
      alert('complete')
    });
  }
}
