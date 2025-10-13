import usePokemons from '@/hook/usePokemons';
import useTheme from '@/hook/useTheme';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useHome = () => {
  const [loading, setLoading] = React.useState(false);
  const { toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { pokemons } = usePokemons();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return {
    loading,
    setLoading,
    toggleTheme,
    changeLanguage,
    t,
    i18n,
    pokemons,
  };
};

export default useHome;
