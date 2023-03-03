import { styled, alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import { useSearchBar } from './useSearchBar'
import InputBase from '@mui/material/InputBase'

const SearchField = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  width: '100%'
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%'
  }
}))

interface ISearchBarProps {
  triggerSearch: any
  placeholder?: string
  ariaLabel?: string
}

export const SearchBar: React.FC<ISearchBarProps> = ({
  triggerSearch,
  placeholder = 'Digite o nome ou email...',
  ariaLabel = 'Campo de busca'
}) => {
  const { query, setQuery } = useSearchBar({ triggerSearch })

  return (
    <SearchField>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        autoComplete="off"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        inputProps={{ 'aria-label': ariaLabel }}
      />
    </SearchField>
  )
}
