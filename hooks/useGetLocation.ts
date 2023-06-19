import { useEffect, useState } from 'react';

interface GetLocationProps {
  state: string
  city: string
}

interface CitiesProps {
  id: 350010505
  nome: 'Adamantina'
}

interface StateProps {
  id: number
  sigla: string
  nome: string
  regiao: {
    id: number
    sigla: string
    nome: string
  }
}

const urls = {
  states: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  cities: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/<@>/distritos'
};

const useGetLocations = ({ state }: GetLocationProps) => {
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [defaultCity, setDefaultCity] = useState<string>('');
  const [fetchingLocations, setFetchingLocations] = useState<boolean>(false);

  useEffect(() => {
    async function getStates() {
      setFetchingLocations(true);
      fetch(urls.states)
        .then(async (res) => {
          const data = await res.json() as StateProps[];
          setStates(
            data
              .map((state) => state.sigla)
              .sort((a, b) =>
                a.localeCompare(b, 'pt', { sensitivity: 'accent' })
              )
          );
        })
        .catch(() => {
          setStates([]);
        }).finally(() => {
          setFetchingLocations(false);
        });
    }
    getStates();
  }, []);

  useEffect(() => {
    async function getCities() {
      if (!state) {
        setCities([]);
        setDefaultCity('');
        return;
      }
      setFetchingLocations(true);
      fetch(urls.cities.replace('<@>', state))
        .then(async (res) => {
          const data = (await res.json()) as CitiesProps[];
          if (state.length === 2) {
            setCities(() => {
              const cities = data
                .map((city) => city.nome)
                .sort((a, b) =>
                  a.localeCompare(b, 'pt', { sensitivity: 'accent' })
                );
              setDefaultCity(cities[0]);
              return data
                .map((city) => city.nome)
                .sort((a, b) =>
                  a.localeCompare(b, 'pt', { sensitivity: 'accent' })
                );
            });
          }
        })
        .catch(() => {
          setCities([]);
          setDefaultCity('');
        })
        .finally(() => {
          setFetchingLocations(false);
        });
    }
    getCities();
  }, [state]);

  return { states, cities, defaultCity, fetchingLocations };
};

export default useGetLocations;
