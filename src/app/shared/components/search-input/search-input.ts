import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.html',

})
export class SearchInput {
  value = output<string>(); 
  placeholder = input<string>('Buscar');

  inputValue = signal<string>('');

  debounceEffect = effect((onCleanup)=>{
    const value = this.inputValue();

    const timeput = setTimeout(()=>{
      this.value.emit(value);
    },500);

    onCleanup(()=>{
      clearTimeout(timeput);
    });
    
  }
)

}
