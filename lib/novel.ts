import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const contentDirectory = path.join(process.cwd(), 'content/novel')

export interface NovelMetadata {
  title: string
  author?: string
  date?: string
  description?: string
}

export interface NovelContent {
  metadata: NovelMetadata
  content: string
  htmlContent: string
  slug: string
}

export interface Chapter {
  slug: string
  title: string
  order: number
}

export interface NovelInfo {
  title: string
  author: string
  description?: string
  totalWordCount?: {
    chinese: number
    english: number
    total: number
  }
}

export interface WordCount {
  chinese: number
  english: number
  total: number
}

// Configure marked options for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
})

// Count all non-whitespace characters (excluding markdown syntax)
function countWords(text: string): WordCount {
  // Remove markdown syntax, frontmatter, and code blocks
  let cleanText = text
    .replace(/^---[\s\S]*?---/m, '') // Remove frontmatter
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/[#*_~\[\]]/g, '') // Remove markdown syntax (but keep regular parentheses)
    .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
    .replace(/\s+/g, '') // Remove all whitespace (spaces, newlines, tabs)

  // Count Chinese characters (CJK Unified Ideographs)
  const chineseMatches = cleanText.match(/[\u4e00-\u9fa5]/g)
  const chineseCount = chineseMatches ? chineseMatches.length : 0

  // Count English characters (all letters)
  const englishMatches = cleanText.match(/[a-zA-Z]/g)
  const englishCount = englishMatches ? englishMatches.length : 0

  // Total is the length of all non-whitespace characters after cleaning
  const totalCount = cleanText.length

  return {
    chinese: chineseCount,
    english: englishCount,
    total: totalCount
  }
}

// Get total word count across all chapters
export function getTotalWordCount(): WordCount {
  if (!fs.existsSync(contentDirectory)) {
    return { chinese: 0, english: 0, total: 0 }
  }

  const files = fs.readdirSync(contentDirectory)
  const chapterFiles = files.filter(file =>
    file.startsWith('chapter_') && file.endsWith('.md')
  )

  let totalChinese = 0
  let totalEnglish = 0

  chapterFiles.forEach(file => {
    const fullPath = path.join(contentDirectory, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { content } = matter(fileContents)

    const wordCount = countWords(content)
    totalChinese += wordCount.chinese
    totalEnglish += wordCount.english
  })

  return {
    chinese: totalChinese,
    english: totalEnglish,
    total: totalChinese + totalEnglish
  }
}

// Get novel metadata from info.md
export function getNovelInfo(): NovelInfo {
  const infoPath = path.join(contentDirectory, 'info.md')

  if (!fs.existsSync(infoPath)) {
    return {
      title: '此岸彼岸',
      author: '王虞之'
    }
  }

  const fileContents = fs.readFileSync(infoPath, 'utf8')
  const { data } = matter(fileContents)

  return {
    title: data.title || '此岸彼岸',
    author: data.author || '王虞之',
    description: data.description
  }
}

// Process character names marked with []
function processCharacterNames(html: string): string {
  // Replace [name] with <span class="character-name">name</span>
  return html.replace(/\[([^\]]+)\]/g, '<span class="character-name">$1</span>')
}

export function getChapterContent(slug: string): NovelContent {
  const fullPath = path.join(contentDirectory, `${slug}.md`)

  // Read the markdown file
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Parse frontmatter and content
  const { data, content } = matter(fileContents)

  // Convert markdown to HTML
  let htmlContent = marked(content) as string

  // Fix Chinese dash spacing: remove spaces around em dashes
  // This fixes marked's automatic space insertion around ——
  htmlContent = htmlContent.replace(/\s+(—+)\s+/g, '$1')

  // Fix Chinese dash rendering: wrap consecutive em dashes in a span with tighter spacing and margin
  htmlContent = htmlContent.replace(/(——+)/g, '<span style="letter-spacing: -0.15em; margin-right: 0.15em;">$1</span>')

  // Process character names
  htmlContent = processCharacterNames(htmlContent)

  return {
    metadata: data as NovelMetadata,
    content,
    htmlContent,
    slug
  }
}

export function getAllChapters(): Chapter[] {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const files = fs.readdirSync(contentDirectory)
  const chapterFiles = files.filter(file =>
    file.startsWith('chapter_') && file.endsWith('.md')
  )

  const chapters = chapterFiles.map(file => {
    const slug = file.replace('.md', '')
    const fullPath = path.join(contentDirectory, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    // Extract chapter number from filename (e.g., chapter_01.md -> 1)
    const match = file.match(/chapter_(\d+)\.md/)
    const order = match ? parseInt(match[1], 10) : 0

    return {
      slug,
      title: data.title || `第${order}章`,
      order
    }
  })

  // Sort by order
  return chapters.sort((a, b) => a.order - b.order)
}
