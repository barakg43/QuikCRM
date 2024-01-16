package main.server.sql.dto;

import java.util.List;

public class ListSubset<T> {
	private final List<T> listSubset;
	private final int totalAmountInDataBase;

	public ListSubset(List<T> subsetList, int totalAmountInDataBase) {
		this.listSubset = subsetList;
		this.totalAmountInDataBase = totalAmountInDataBase;
	}
}
