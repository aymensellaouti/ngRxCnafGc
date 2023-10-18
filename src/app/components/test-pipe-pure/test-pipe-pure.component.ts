import { Component } from "@angular/core";

@Component({
  selector: "app-test-pipe-pure",
  templateUrl: "./test-pipe-pure.component.html",
  styleUrls: ["./test-pipe-pure.component.css"],
})
export class TestPipePureComponent {
  message = "";
  elements: number[] = [];

  constructor() {
    for (let i = 0; i < 50; i++) {
      this.elements[i] = this.getRandomValBetween(20, 30);
    }
  }

  private getRandomValBetween(min: number, max: number): number {
    return Math.ceil(Math.random() * min) + (max - min);
  }

  private f(x: number): number {
    if (x == 0 || x == 1) {
      return 1;
    } else {
      return 2 * this.f(x - 1) + 3 * this.f(x - 2);
    }
  }

  processElement(x: number): number {
    const result = this.f(x);
    console.log(result);
    return result;
  }
}
