import { XIcon } from '@/icons/XIcon'
import { useCodelessStore } from '@/stores/codeless'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FC, useState } from 'react'
import GitHubButton from 'react-github-btn'
import { ExternalLink } from './ExternalLink'
import { GitHubIcon } from '@/icons/GitHubIcon'
import Link from 'next/link'
import { ArrowRight } from '@mui/icons-material'

export const Header: FC = () => {
  const onlySmallScreen = useMediaQuery('(max-width:599px)')

  const { data: session } = useSession()

  const id = useCodelessStore((state) => state.id)

  const mode = useCodelessStore((state) => state.mode)

  const name = useCodelessStore((state) => state.name)

  const user = useCodelessStore((state) => state.user)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    signOut()
    setAnchorEl(null)
  }

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        padding="20px 20px 0 20px"
      >
        <Stack alignItems="center" direction="row" gap={1}>
          {!onlySmallScreen && (
            <>
              <a href="/" style={{ color: 'white' }}>
                <Typography
                  component="h1"
                  variant="h6"
                  textTransform="lowercase"
                >
                  Codeless
                </Typography>
              </a>
              {mode === 'demo' && (
                <Chip
                  label="Beta"
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              )}
              {user.username.length > 0 && <ArrowRight />}
            </>
          )}
          {user.username.length > 0 && (
            <>
              <Avatar src={user.imageUrl} sx={{ width: 24, height: 24 }} />
              <Typography
                component="h1"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                variant="h6"
              >
                {name}
              </Typography>
            </>
          )}
        </Stack>
        <Stack alignItems="center" direction="row" gap={2}>
          {mode === 'demo' && (
            <>
              {session?.user ? (
                <Button
                  disableRipple
                  onClick={handleClick}
                  sx={{
                    color: 'white',
                    p: 0,
                    border: 'none',
                    mt: -0.5,
                    minWidth: 0,
                  }}
                >
                  <Stack alignItems="center" direction="row" gap={1}>
                    <img height={24} src={session.user.image!} />
                    {!onlySmallScreen && (
                      <Typography textTransform="none">
                        {session.user?.email}
                      </Typography>
                    )}
                  </Stack>
                </Button>
              ) : (
                <Button
                  disableRipple
                  onClick={() => signIn('github')}
                  sx={{ color: 'white', textTransform: 'none' }}
                >
                  Sign In
                </Button>
              )}
            </>
          )}
          <ExternalLink href="https://x.com/CodelessAI">
            <XIcon size={18} />
          </ExternalLink>
          <ExternalLink href="https://github.com/ctate/codeless">
            <GitHubIcon size={20} />
          </ExternalLink>
          {!onlySmallScreen && (
            <Box>
              <GitHubButton
                href="https://github.com/ctate/codeless"
                data-color-scheme="no-preference: dark; light: dark; dark: dark;"
                data-icon="octicon-star"
                data-show-count="true"
                aria-label="Star ctate/codeless on GitHub"
              >
                Star
              </GitHubButton>
            </Box>
          )}
        </Stack>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ marginTop: 1, width: 500 }}
      >
        <MenuItem onClick={handleClose}>
          <ExternalLink href={`https://github.com/${session?.user?.email}`}>
            GitHub Profile
          </ExternalLink>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
      </Menu>
    </>
  )
}
