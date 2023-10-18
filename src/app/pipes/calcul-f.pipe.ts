import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "calculF",
  pure: true,
})
export class CalculFPipe implements PipeTransform {
  transform(x: number): number {
    const result = this.f(x);
    console.log(result);
    return result;
  }

  private f(x: number): number {
    if (x == 0 || x == 1) {
      return 1;
    } else {
      return 2 * this.f(x - 1) + 3 * this.f(x - 2);
    }
  }
}
