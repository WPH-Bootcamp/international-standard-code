import { getAllPokemons } from '@/services/pokemon.service';
import { useQuery } from '@tanstack/react-query';

const usePokemons = () => {
  const { data: pokemons, isLoading: loadingPokemons } = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getAllPokemons(),
  });

  return {
    pokemons,
    loadingPokemons,
  };
};

export default usePokemons;
