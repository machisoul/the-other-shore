import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'visits.json')

// 确保数据目录存在
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// 读取访问数据
function readVisits(): { [key: string]: number } {
  ensureDataDir()
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading visits data:', error)
  }
  return {}
}

// 写入访问数据
function writeVisits(data: { [key: string]: number }) {
  ensureDataDir()
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error writing visits data:', error)
  }
}

export async function POST(request: Request) {
  try {
    const { path: visitPath } = await request.json()

    if (!visitPath) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 })
    }

    const visits = readVisits()

    // 增加该路径的访问次数
    visits[visitPath] = (visits[visitPath] || 0) + 1

    // 同时增加总访问次数
    visits['__total__'] = (visits['__total__'] || 0) + 1

    writeVisits(visits)

    return NextResponse.json({
      path: visitPath,
      count: visits[visitPath],
      total: visits['__total__']
    })
  } catch (error) {
    console.error('Error tracking visit:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const visitPath = searchParams.get('path')

    const visits = readVisits()

    if (visitPath) {
      // 返回特定路径的访问次数
      return NextResponse.json({
        path: visitPath,
        count: visits[visitPath] || 0
      })
    } else {
      // 返回总访问次数
      return NextResponse.json({
        total: visits['__total__'] || 0
      })
    }
  } catch (error) {
    console.error('Error getting visit count:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
