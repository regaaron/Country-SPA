import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.html',

})
export class SearchInput {
  value = output<string>(); 
  placeholder = input<string>('Buscar');

  initialValue = input<string>('');

  inputValue = linkedSignal<string>(() => this.initialValue());

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
