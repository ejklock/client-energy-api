class EligibilityService {
  public calculateMonthsAverageConsumption(monthsConsumption: number[]) {
    return (
      monthsConsumption.reduce((prev, curr) => {
        return prev + curr
      }) / monthsConsumption.length
    )
  }
}
