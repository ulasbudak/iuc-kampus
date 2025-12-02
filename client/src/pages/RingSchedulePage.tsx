const RingSchedulePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🚌 Ring Saatleri</h1>
          <p className="text-gray-600">İstanbul Üniversitesi-Cerrahpaşa Ring Servis Saatleri</p>
        </div>

        <div className="space-y-6">
          {/* Birinci Bölüm */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-primary-600 mb-4">
              Avcılar Kampüs A Kapısı - KYK Prof. Dr. Halil İnalcık Kız Öğrenci Yurdu
            </h2>
            <p className="text-gray-700 text-lg">
              Saat 23.00'a kadar Ringler doldukça kalkıyor.
            </p>
          </div>

          {/* İkinci Bölüm */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-primary-600 mb-6">
              Avcılar Yerleşkesi - Büyükçekmece Yerleşkesi
            </h2>
            
            <div className="space-y-6">
              {/* Avcılar Kampüsü */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Avcılar Kampüsü H.S.
                </h3>
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-primary-100 text-primary-700 rounded-md font-medium">
                    08:45
                  </div>
                  <div className="px-4 py-2 bg-primary-100 text-primary-700 rounded-md font-medium">
                    13:30
                  </div>
                </div>
              </div>

              {/* Büyükçekmece Kampüsü */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Büyükçekmece Kampüsü H.S.
                </h3>
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-primary-100 text-primary-700 rounded-md font-medium">
                    10:00
                  </div>
                  <div className="px-4 py-2 bg-primary-100 text-primary-700 rounded-md font-medium">
                    15:30
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RingSchedulePage

