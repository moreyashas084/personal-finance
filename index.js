import React, { useState, useEffect } from 'react';
import { DollarSign, Home, TrendingUp, AlertCircle, PiggyBank, Calculator } from 'lucide-react';

export default function FinanceTracker() {
  const [salary, setSalary] = useState(130000);
  const [dadContribution, setDadContribution] = useState(40000);
  const [myEmiContribution, setMyEmiContribution] = useState(14000);
  const [termInsurance, setTermInsurance] = useState(50000);
  const [propertyTax, setPropertyTax] = useState(55000);
  const [houseMaintenance, setHouseMaintenance] = useState(42000);
  const [targetPartPayment, setTargetPartPayment] = useState(900000);
  const [emergencyBufferBuilt, setEmergencyBufferBuilt] = useState(0);
  const [investmentPercentage, setInvestmentPercentage] = useState(10);
  const [monthlyExpenses, setMonthlyExpenses] = useState({
    groceries: 8000,
    utilities: 3000,
    transport: 5000,
    entertainment: 4000,
    miscellaneous: 5000
  });

  const totalEmi = dadContribution + myEmiContribution;
  const annualFixedCosts = termInsurance + propertyTax + houseMaintenance;
  const monthlyFixedCosts = annualFixedCosts / 12;
  
  const monthlyInvestment = (salary * investmentPercentage) / 100;
  const totalMonthlyExpenses = Object.values(monthlyExpenses).reduce((a, b) => a + b, 0);
  const monthlySavings = salary - myEmiContribution - monthlyFixedCosts - totalMonthlyExpenses - monthlyInvestment;
  const annualSavings = monthlySavings * 12;
  const annualInvestment = monthlyInvestment * 12;
  
  const requiredBufferAmount = totalEmi * 6;
  const bufferGap = requiredBufferAmount - emergencyBufferBuilt;
  const partPaymentDeficit = targetPartPayment - annualSavings;

  const updateExpense = (category, value) => {
    setMonthlyExpenses(prev => ({
      ...prev,
      [category]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Personal Finance & EMI Tracker</h1>
          </div>

          {/* Income Section */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200">
              <label className="block text-sm font-semibold text-green-800 mb-2">Monthly Salary (In Hand)</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-200">
              <label className="block text-sm font-semibold text-blue-800 mb-2">Dad's EMI Contribution</label>
              <input
                type="number"
                value={dadContribution}
                onChange={(e) => setDadContribution(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-2 border-purple-200">
              <label className="block text-sm font-semibold text-purple-800 mb-2">My EMI Contribution</label>
              <input
                type="number"
                value={myEmiContribution}
                onChange={(e) => setMyEmiContribution(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Annual Fixed Costs */}
          <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200 mb-8">
            <h2 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
              <Home className="w-6 h-6" />
              Annual Fixed Costs
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Term Insurance (Annual)</label>
                <input
                  type="number"
                  value={termInsurance}
                  onChange={(e) => setTermInsurance(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Property Tax (Annual)</label>
                <input
                  type="number"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">House Maintenance (Annual)</label>
                <input
                  type="number"
                  value={houseMaintenance}
                  onChange={(e) => setHouseMaintenance(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="mt-4 p-3 bg-orange-100 rounded-lg">
              <p className="text-sm text-gray-700">Total Annual: <span className="font-bold text-orange-800">₹{annualFixedCosts.toLocaleString('en-IN')}</span></p>
              <p className="text-sm text-gray-700">Monthly Average: <span className="font-bold text-orange-800">₹{monthlyFixedCosts.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span></p>
            </div>
          </div>

          {/* Monthly Variable Expenses */}
          <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-200 mb-8">
            <h2 className="text-xl font-bold text-pink-800 mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6" />
              Monthly Variable Expenses
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(monthlyExpenses).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{key}</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => updateExpense(key, e.target.value)}
                    className="w-full px-3 py-2 border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-pink-100 rounded-lg">
              <p className="text-sm text-gray-700">Total Monthly Expenses: <span className="font-bold text-pink-800">₹{totalMonthlyExpenses.toLocaleString('en-IN')}</span></p>
            </div>
          </div>

          {/* Investment Component */}
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl border-2 border-teal-200 mb-8">
            <h2 className="text-xl font-bold text-teal-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Monthly Investment Allocation
            </h2>
            <div className="mb-4 p-3 bg-teal-50 rounded-lg border border-teal-300">
              <p className="text-sm text-gray-700">💰 Invest a percentage of your salary for long-term wealth building (mutual funds, stocks, SIP, etc.)</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Investment Percentage of Salary</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={investmentPercentage}
                    onChange={(e) => setInvestmentPercentage(parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="number"
                    value={investmentPercentage}
                    onChange={(e) => setInvestmentPercentage(Math.min(30, Math.max(0, parseFloat(e.target.value) || 0)))}
                    className="w-20 px-3 py-2 border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="text-lg font-bold text-teal-800">%</span>
                </div>
              </div>
              <div className="bg-teal-100 p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-1">Monthly Investment:</p>
                <p className="text-2xl font-bold text-teal-800">₹{monthlyInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                <p className="text-sm text-gray-600 mt-2">Annual: ₹{annualInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
              </div>
            </div>
          </div>

          {/* Summary Dashboard */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border-2 border-indigo-200">
              <h3 className="text-lg font-bold text-indigo-800 mb-4">Monthly Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Salary:</span>
                  <span className="font-semibold text-green-600">₹{salary.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">My EMI Contribution:</span>
                  <span className="font-semibold text-red-600">-₹{myEmiContribution.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Fixed Costs (Monthly Avg):</span>
                  <span className="font-semibold text-red-600">-₹{monthlyFixedCosts.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Variable Expenses:</span>
                  <span className="font-semibold text-red-600">-₹{totalMonthlyExpenses.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Monthly Investment ({investmentPercentage}%):</span>
                  <span className="font-semibold text-blue-600">-₹{monthlyInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                </div>
                <div className="border-t-2 border-indigo-300 pt-2 flex justify-between">
                  <span className="font-bold text-gray-800">Monthly Savings:</span>
                  <span className={`font-bold text-xl ${monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{monthlySavings.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-xl border-2 border-cyan-200">
              <h3 className="text-lg font-bold text-cyan-800 mb-4">Annual Projection</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Annual Savings (After All):</span>
                  <span className="font-semibold text-green-600">₹{annualSavings.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Annual Investment:</span>
                  <span className="font-semibold text-blue-600">₹{annualInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Annual Income:</span>
                  <span className="font-semibold text-gray-600">₹{(salary * 12).toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t-2 border-cyan-300 pt-2 flex justify-between">
                  <span className="font-bold text-gray-800">Savings Rate:</span>
                  <span className="font-bold text-xl text-cyan-600">
                    {((annualSavings / (salary * 12)) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Buffer Section - Separate */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border-2 border-red-200 mb-8">
            <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Emergency EMI Buffer (Lifetime Safety Net)
            </h3>
            <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-300">
              <p className="text-sm text-gray-700">💡 This is your safety net for job loss or personal emergencies. Keep this separate from part payments.</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Amount Already Saved for Buffer</label>
              <input
                type="number"
                value={emergencyBufferBuilt}
                onChange={(e) => setEmergencyBufferBuilt(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border-2 border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter amount already saved"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Required Buffer (6 months EMI):</span>
                <span className="font-semibold">₹{requiredBufferAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Currently Saved:</span>
                <span className="font-semibold">₹{emergencyBufferBuilt.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t-2 border-red-300 pt-2 flex justify-between items-center">
                <span className="font-bold text-gray-800">Still Need to Save:</span>
                <span className={`font-bold text-xl ${bufferGap <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {bufferGap <= 0 ? '✓ Complete!' : `₹${bufferGap.toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>
            {bufferGap > 0 && (
              <div className="mt-4 p-3 bg-orange-100 rounded-lg border border-orange-300">
                <p className="text-sm text-orange-800">
                  <strong>Recommended:</strong> Save ₹{(bufferGap / 12).toLocaleString('en-IN', {maximumFractionDigits: 0})}/month to build buffer in 12 months
                </p>
              </div>
            )}
          </div>

          {/* Part Payment Goal */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border-2 border-yellow-200 mb-8">
            <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2">
              <PiggyBank className="w-6 h-6" />
              Annual Part Payment Goal (Separate from Emergency Buffer)
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Part Payment Amount</label>
              <input
                type="number"
                value={targetPartPayment}
                onChange={(e) => setTargetPartPayment(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border-2 border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Target Annual Part Payment:</span>
                <span className="font-semibold">₹{targetPartPayment.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Your Annual Savings:</span>
                <span className="font-semibold">₹{annualSavings.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
              </div>
              <div className="border-t-2 border-yellow-300 pt-2 flex justify-between items-center">
                <span className="font-bold text-gray-800">Gap/Surplus:</span>
                <span className={`font-bold text-xl ${partPaymentDeficit <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {partPaymentDeficit > 0 ? '-' : '+'}₹{Math.abs(partPaymentDeficit).toLocaleString('en-IN', {maximumFractionDigits: 0})}
                </span>
              </div>
            </div>
          </div>

          {/* Alerts and Recommendations */}
          {(monthlySavings < 0 || partPaymentDeficit > 0 || bufferGap > 0) && (
            <div className="bg-red-50 border-2 border-red-200 p-6 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">Financial Alerts</h3>
                  {monthlySavings < 0 && (
                    <p className="text-red-700 mb-2">⚠️ Your monthly expenses exceed your income. Consider reducing variable expenses.</p>
                  )}
                  {bufferGap > 0 && monthlySavings >= 0 && (
                    <p className="text-orange-700 mb-2">💡 You still need ₹{bufferGap.toLocaleString('en-IN')} for your emergency buffer. Consider saving ₹{(bufferGap / 12).toLocaleString('en-IN', {maximumFractionDigits: 0})}/month.</p>
                  )}
                  {partPaymentDeficit > 0 && monthlySavings >= 0 && (
                    <div>
                      <p className="text-red-700 mb-2">⚠️ You're ₹{partPaymentDeficit.toLocaleString('en-IN', {maximumFractionDigits: 0})} short of your annual part payment goal.</p>
                      <p className="text-gray-700 text-sm">Consider reducing monthly expenses by ₹{(partPaymentDeficit / 12).toLocaleString('en-IN', {maximumFractionDigits: 0})} per month or adjusting your target.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {monthlySavings >= 0 && partPaymentDeficit <= 0 && bufferGap <= 0 && (
            <div className="bg-green-50 border-2 border-green-200 p-6 rounded-xl">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-2">Excellent Financial Health! 🎉</h3>
                  <p className="text-green-700">You've built your emergency buffer AND you're on track to meet your annual part payment goals!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-200">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Total EMI (Combined)</h4>
            <p className="text-2xl font-bold text-blue-600">₹{totalEmi.toLocaleString('en-IN')}</p>
            <p className="text-xs text-gray-500 mt-1">Dad: ₹{dadContribution.toLocaleString('en-IN')} + You: ₹{myEmiContribution.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-200">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Emergency Buffer Status</h4>
            <p className="text-2xl font-bold text-purple-600">
              {bufferGap <= 0 ? '✓ Complete' : `${((emergencyBufferBuilt / requiredBufferAmount) * 100).toFixed(0)}%`}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {bufferGap <= 0 ? 'Safety net secured' : `₹${bufferGap.toLocaleString('en-IN')} remaining`}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-teal-200">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Monthly Investment</h4>
            <p className="text-2xl font-bold text-teal-600">₹{monthlyInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
            <p className="text-xs text-gray-500 mt-1">{investmentPercentage}% of salary • ₹{annualInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0})}/year</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-200">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Annual Savings Rate</h4>
            <p className="text-2xl font-bold text-green-600">{((annualSavings / (salary * 12)) * 100).toFixed(1)}%</p>
            <p className="text-xs text-gray-500 mt-1">Of your annual income</p>
          </div>
        </div>
      </div>
    </div>
  );
}