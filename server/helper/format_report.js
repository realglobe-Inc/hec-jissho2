const formatReport = {
  toReportFullId ({actorKey, reportId}) {
    return `${actorKey}#${reportId}`
  },
  toActorKey (reportFullId) {
    return reportFullId.split('#')[0]
  },
  toReportId (reportFullId) {
    return parseInt(reportFullId.split('#')[1], 10)
  }
}

module.exports = formatReport
