import { projects, STATUS_LABEL } from '../data/projects'
import { profile } from '../data/profile'

export const THEMES = ['night-ops', 'cyberpunk', 'phosphor', 'paper'] as const
export type ThemeName = (typeof THEMES)[number]

export const DEFAULT_THEME: ThemeName = 'night-ops'

export type CommandAction =
  | { type: 'theme'; name: ThemeName }
  | { type: 'open'; url: string }
  | { type: 'crab' }
  | { type: 'clear' }
  | { type: 'exit' }

export interface CommandResult {
  lines: string[]
  action?: CommandAction
}

const HELP: string[] = [
  'available commands:',
  '  help .............. this list',
  '  whoami ............ operator file',
  '  systems ........... list tracked systems',
  '  open <id> ......... open a system’s repository (e.g. open roleatlas)',
  '  theme <name> ...... night-ops · cyberpunk · phosphor · paper',
  '  crab .............. release the crab',
  '  deltarune ......... ???',
  '  sudo .............. try it',
  '  clear ............. wipe the console',
  '  exit .............. close the console',
]

export const BOOT_LINES: string[] = [
  'MISSION CONTROL console v1.0.0',
  'connection: local · clearance: OPERATOR',
  'type `help` to see what this thing can do.',
]

export function executeCommand(raw: string): CommandResult {
  const input = raw.trim()
  if (!input) return { lines: [] }

  const [cmd, ...args] = input.toLowerCase().split(/\s+/)
  const arg = args.join(' ')

  switch (cmd) {
    case 'help':
    case '?':
    case 'man':
      return { lines: HELP }

    case 'whoami':
      return {
        lines: [
          `${profile.name} — ${profile.handle}`,
          profile.education.degree,
          `${profile.education.school} · ${profile.education.period}`,
          profile.currently,
          `status: ${profile.availability}`,
        ],
      }

    case 'systems':
    case 'projects':
    case 'ls':
      return {
        lines: [
          'tracked systems:',
          ...projects.map(
            (p) => `  ${p.index}  ${p.id.padEnd(18)} [${STATUS_LABEL[p.status]}]  ${p.tagline}`,
          ),
          'use `open <id>` to visit a repository.',
        ],
      }

    case 'open': {
      if (!arg) return { lines: ['usage: open <id> — try `systems` to list ids.'] }
      const project = projects.find((p) => p.id === arg || p.id.startsWith(arg))
      if (!project) return { lines: [`no system matches "${arg}". try \`systems\`.`] }
      return { lines: [`opening ${project.repo} …`], action: { type: 'open', url: project.repo } }
    }

    case 'theme': {
      if (!arg) return { lines: [`current themes: ${THEMES.join(' · ')}`] }
      const match = THEMES.find((t) => t === arg)
      if (!match) {
        return { lines: [`unknown theme "${arg}". options: ${THEMES.join(' · ')}`] }
      }
      const flavor: Record<ThemeName, string> = {
        'night-ops': 'back to baseline. all systems nominal.',
        cyberpunk: 'neon protocol engaged. welcome to Night City, samurai.',
        phosphor: 'CRT mode. mind the burn-in.',
        paper: 'lab notebook mode. everything looks official in serif-less print.',
      }
      return {
        lines: [`theme → ${match}. ${flavor[match]}`],
        action: { type: 'theme', name: match },
      }
    }

    case 'crab':
    case 'ferris':
    case '🦀':
      return {
        lines: ['releasing the crab. it knows what it did.'],
        action: { type: 'crab' },
      }

    case 'deltarune':
      return {
        lines: [
          '* (You typed the forbidden word.)',
          '* (The power of honest systems shines within you.)',
          '* (Your SOUL is now 12% more traceable.)',
        ],
      }

    case 'sudo':
      return { lines: ['permission denied: this incident will be reported to the crab.'] }

    case 'rm':
      return arg.includes('-rf') || arg.includes('/')
        ? { lines: ['nice try. the deck is read-only, and so is my patience.'] }
        : { lines: ['rm: missing operand — and missing judgment.'] }

    case 'vim':
    case 'emacs':
      return { lines: [`${cmd}: not found. this console has opinions about editors.`] }

    case 'exit':
    case 'quit':
    case 'q':
      return {
        lines: ['closing console. the systems keep running without you.'],
        action: { type: 'exit' },
      }

    case 'clear':
    case 'cls':
      return { lines: [], action: { type: 'clear' } }

    case 'pwd':
      return { lines: ['/home/operator/mission-control'] }

    case 'ping':
      return { lines: ['pong — 0.3ms. the deck is local, after all.'] }

    default:
      return { lines: [`command not found: ${cmd} — try \`help\`.`] }
  }
}
