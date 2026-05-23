import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockNotifications } from '../data/mockData';
import { Bell, CheckCheck, Inbox, AlertCircle } from 'lucide-react';

export function NotificationsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!user) return null;

  const notifications = mockNotifications[user.role] || [];
  const filteredNotifications = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'approval':
      case 'procurement':
        return '📋';
      case 'maintenance':
        return '🔧';
      case 'borrowing':
        return '📦';
      case 'system':
        return '🔔';
      default:
        return '📌';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifikasi</h1>
        <p className="text-gray-600">Semua pemberitahuan dan update terbaru</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-[#6B1F3A] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Semua ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'unread'
                ? 'bg-[#6B1F3A] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Belum Dibaca ({notifications.filter((n) => !n.read).length})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => {
              if (notification.actionUrl) {
                navigate(notification.actionUrl);
              }
            }}
            className={`bg-white rounded-xl p-6 border-2 transition-all ${
              notification.read
                ? 'border-gray-200 hover:border-gray-300'
                : 'border-[#6B1F3A] hover:border-[#5a1a31] shadow-sm'
            } ${notification.actionUrl ? 'cursor-pointer' : ''}`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{getTypeIcon(notification.type)}</div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notification.title}
                    </h3>
                    <p className={`text-sm mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>
                  </div>

                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-[#6B1F3A] ml-2 mt-2" />
                  )}
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs text-gray-500">{notification.date}</span>
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getPriorityColor(notification.priority)}`}>
                    {notification.priority === 'high' ? 'Penting' : notification.priority === 'medium' ? 'Sedang' : 'Rendah'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            {filter === 'unread' ? (
              <>
                <CheckCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Semua notifikasi sudah dibaca</p>
              </>
            ) : (
              <>
                <Inbox className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Belum ada notifikasi</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
