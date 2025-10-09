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
}

// Configure marked options for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
})

// Get novel metadata from info.md
export function getNovelInfo(): NovelInfo {
  const infoPath = path.join(contentDirectory, 'info.md')

  if (!fs.existsSync(infoPath)) {
    return {
      title: '余晓',
      author: '作者名'
    }
  }

  const fileContents = fs.readFileSync(infoPath, 'utf8')
  const { data } = matter(fileContents)

  return {
    title: data.title || '余晓',
    author: data.author || '作者名',
    description: data.description
  }
}

export function getChapterContent(slug: string): NovelContent {
  const fullPath = path.join(contentDirectory, `${slug}.md`)

  // Read the markdown file
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Parse frontmatter and content
  const { data, content } = matter(fileContents)

  // Convert markdown to HTML
  const htmlContent = marked(content)

  return {
    metadata: data as NovelMetadata,
    content,
    htmlContent: htmlContent as string,
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
