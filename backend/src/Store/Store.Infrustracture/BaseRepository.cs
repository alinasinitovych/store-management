using Microsoft.EntityFrameworkCore;
using Store.Domain.Entities;
using Store.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Infrustracture
{
	public class BaseRepository<T> : IBaseRepository<T> where T : class
	{
		internal readonly StoreDbContext _context;
		internal readonly DbSet<T> _entitySet;

		public BaseRepository(StoreDbContext appContext)
		{
			_context = appContext;
			_entitySet = appContext.Set<T>();
		}

		public async Task<T> GetByIdAsync(object id)
		{
			return await _context.Set<T>().FindAsync(id);
		}

		public async Task<IEnumerable<T>> GetAllAsync()
		{
			return await _context.Set<T>().ToListAsync();
		}

		public async Task<T> AddAsync(T entity)
		{
			var createdEntity = await _context.Set<T>().AddAsync(entity);
			await _context.SaveChangesAsync();
			return createdEntity.Entity;
			
		}

		public async Task UpdateAsync(T entity)
		{
			_context.Set<T>().Update(entity);
			await _context.SaveChangesAsync();
		}

		public async Task DeleteAsync(T entity)
		{
			_context.Set<T>().Remove(entity);
			await _context.SaveChangesAsync();
		}
	}
}
