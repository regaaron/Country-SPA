import { Country } from "../interfaces/country.interfaces";
import { RESTCountry, Object } from "../interfaces/rest-countries.interfaces";

export class CountryMapper {

  // Convierte un país de la API a tu modelo Country
  static mapObjectToCountry(country: Object): Country {

    return {
      cca2: country.uuid,
      flag: country.flag.emoji,
      FlagSvg: country.flag.url_svg,
      name: country.names.translations["spa"]?.common ?? country.names.common,
      capital: country.capitals[0]?.name ?? '',
      population: country.population,
    };

  }

  // Convierte toda la respuesta de la API en un arreglo de Country
  static mapResponseToCountryArray(response: RESTCountry): Country[] {

    return response.data.objects.map(country =>
      this.mapObjectToCountry(country)
    );

  }

}