const MOCK_LATENCY_MS = 250

const boothRecords = [
  {
    epic: 'ABC1234567',
    boothName: 'Government Higher Secondary School',
    ward: 'Sample Ward 12',
    address: 'MG Road, Civic Centre, Pune',
    room: 'Room 4',
    pollingDate: 'Demo election day',
    officerHelpdesk: '1800-000-1950',
  },
  {
    epic: 'DASH2026',
    boothName: 'Municipal Primary School',
    ward: 'Sample Ward 08',
    address: 'Station Road, Lucknow',
    room: 'Room 2',
    pollingDate: 'Demo election day',
    officerHelpdesk: '1800-000-1950',
  },
]

function delay(value) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(value), MOCK_LATENCY_MS)
  })
}

export async function findPollingBooth(epic) {
  const normalizedEpic = String(epic).trim().toUpperCase()
  const match = boothRecords.find((record) => record.epic === normalizedEpic)

  return delay(
    match || {
      epic: normalizedEpic || 'DEMO',
      boothName: 'Government School',
      ward: 'Sample Ward',
      address: 'Demo locality, demo city',
      room: 'Room 1',
      pollingDate: 'Demo election day',
      officerHelpdesk: '1800-000-1950',
    },
  )
}

