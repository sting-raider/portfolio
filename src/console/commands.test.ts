import { describe, expect, it } from 'vitest'
import { BOOT_LINES, executeCommand, THEMES } from './commands'
import { projects } from '../data/projects'

describe('executeCommand', () => {
  it('returns help for help/?/man', () => {
    for (const cmd of ['help', '?', 'man']) {
      const result = executeCommand(cmd)
      expect(result.lines.join('\n')).toContain('available commands')
      expect(result.action).toBeUndefined()
    }
  })

  it('handles empty input without crashing', () => {
    expect(executeCommand('').lines).toEqual([])
    expect(executeCommand('   ').lines).toEqual([])
  })

  it('is case-insensitive', () => {
    expect(executeCommand('HELP').lines).toEqual(executeCommand('help').lines)
  })

  it('lists every project in systems', () => {
    const result = executeCommand('systems')
    for (const p of projects) {
      expect(result.lines.join('\n')).toContain(p.id)
    }
  })

  it('opens a project by exact id and by prefix', () => {
    const exact = executeCommand('open roleatlas')
    expect(exact.action).toEqual({ type: 'open', url: 'https://github.com/sting-raider/RoleAtlas' })

    const prefix = executeCommand('open docker')
    expect(prefix.action).toEqual({
      type: 'open',
      url: 'https://github.com/sting-raider/dockerscope',
    })
  })

  it('rejects unknown project ids', () => {
    const result = executeCommand('open skynet')
    expect(result.action).toBeUndefined()
    expect(result.lines.join('\n')).toContain('no system matches')
  })

  it('switches to every known theme', () => {
    for (const theme of THEMES) {
      const result = executeCommand(`theme ${theme}`)
      expect(result.action).toEqual({ type: 'theme', name: theme })
    }
  })

  it('rejects unknown themes', () => {
    const result = executeCommand('theme hotdog-stand')
    expect(result.action).toBeUndefined()
    expect(result.lines.join('\n')).toContain('unknown theme')
  })

  it('denies sudo with a joke, not a crash', () => {
    const result = executeCommand('sudo rm -rf /')
    expect(result.lines.join('\n')).toContain('permission denied')
  })

  it('refuses rm -rf /', () => {
    const result = executeCommand('rm -rf /')
    expect(result.lines.join('\n')).toContain('nice try')
  })

  it('answers the forbidden word', () => {
    const result = executeCommand('deltarune')
    expect(result.lines.join('\n')).toContain('shines within you')
  })

  it('releases the crab', () => {
    expect(executeCommand('crab').action).toEqual({ type: 'crab' })
    expect(executeCommand('ferris').action).toEqual({ type: 'crab' })
  })

  it('clears and exits', () => {
    expect(executeCommand('clear').action).toEqual({ type: 'clear' })
    expect(executeCommand('exit').action).toEqual({ type: 'exit' })
  })

  it('handles unknown commands gracefully', () => {
    const result = executeCommand('frobnicate')
    expect(result.lines.join('\n')).toContain('command not found')
  })

  it('has a boot message', () => {
    expect(BOOT_LINES.length).toBeGreaterThan(0)
  })
})
